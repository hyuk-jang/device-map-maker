require('dotenv').config();
const _ = require('lodash');
require('default-intelligence');
const {BU} = require('base-util-jh');
const {TempStorage} = require('base-model-jh');

const map = require('./map');

const BiModule = require('./BiModule');

class UploadToDB {
  constructor() {
    const dbInfo = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_DB,
    };
    BU.CLI(dbInfo);
    this.biModule = new BiModule(dbInfo);

    this.drawInfo = map.drawInfo;
    this.setInfo = map.setInfo;
    this.realtionInfo = map.realtionInfo;
    this.controlInfo = map.controlInfo;

    this.main_seq = this.setInfo.mainInfo.main_seq;

    this.map = map;
  }

  async startUpload() {
    console.time('setDataLoggerDef');
    await this.setDataLoggerDef();
    console.timeEnd('setDataLoggerDef');
    console.time('setDataLogger');
    await this.setDataLogger();
    console.timeEnd('setDataLogger');
    console.time('setNodeClass');
    await this.setNodeClass();
    console.timeEnd('setNodeClass');
    console.time('setNodeDef');
    await this.setNodeDef();
    console.timeEnd('setNodeDef');
    console.time('setNode');
    await this.setNode();
    console.timeEnd('setNode');
    console.time('setPlaceClass');
    await this.setPlaceClass();
    console.timeEnd('setPlaceClass');
    console.time('setPlaceDef');
    await this.setPlaceDef();
    console.timeEnd('setPlaceDef');
    console.time('setPlace');
    await this.setPlace();
    console.timeEnd('setPlace');
    console.time('setPlaceRelation');
    await this.setPlaceRelation();
    console.timeEnd('setPlaceRelation');
  }

  /**
   * 저장소에 저장된 내역을 기준으로 insert, update 수행 후 Promise 반환
   * @param {TempStorage} storage TempStroage Class Object
   * @param {string} tblName
   * @param {string[]} updateKeyList
   * @return {Promise}
   */
  async doQuery(storage, tblName, updateKeyList, hasViewQuery) {
    const finalStorage = storage.getFinalStorage();

    await this.biModule.setTables(tblName, finalStorage.insertObjList, hasViewQuery);

    await this.biModule.updateTablesByPool(
      tblName,
      updateKeyList,
      finalStorage.updateObjList,
      hasViewQuery,
    );

    return true;
  }

  /**
   * @desc Step 1. DV_DATA_LOGGER_DEF
   * 장치 구성 정보 설정
   */
  async setDataLoggerDef() {
    const tempStorage = new TempStorage();
    const prevDLGList = await this.biModule.getTable('DV_DATA_LOGGER_DEF');

    tempStorage.setExistStorage(prevDLGList);

    this.map.setInfo.dataLoggerStructureList.forEach(dataLoggerInfo => {
      const pickInfo = _.pick(dataLoggerInfo, ['target_prefix', 'target_name']);
      tempStorage.addStorage(pickInfo, 'target_prefix', 'data_logger_def_seq');
    });

    return this.doQuery(tempStorage, 'DV_DATA_LOGGER_DEF', ['data_logger_def_seq'], false);
  }

  /**
   * @desc Step 2. DV_DATA_LOGGER
   * 장치 구성 정보 설정
   */
  async setDataLogger() {
    const tempStorage = new TempStorage();

    /** @type {DV_DATA_LOGGER_DEF[]} */
    const prevDLGList = await this.biModule.getTable('DV_DATA_LOGGER_DEF');
    /** @type {DV_DATA_LOGGER[]} */
    const prevDLList = await this.biModule.getDataLoggerTbl([this.main_seq]);

    // BU.CLI(prevDLList)

    const {dccConstructorList, dpcConstructorList} = this.setInfo;

    tempStorage.setExistStorage(prevDLList);

    // 데이터 로거 대분류 구조 순회
    this.map.setInfo.dataLoggerStructureList.forEach(dataLoggerClassInfo => {
      // 데이터 로거 장치 목록 순회
      dataLoggerClassInfo.dataLoggerDeviceList.forEach(dataLoggerDeviceInfo => {
        let dataLoggerId = dataLoggerClassInfo.target_prefix;
        if (dataLoggerDeviceInfo.target_code.length) {
          dataLoggerId += `_${dataLoggerDeviceInfo.target_code}`;
        }

        /**
         * Device ID(S/N)를 설정하기 위하여 별도로 작업
         * @type {protocol_info}
         */
        const protocolInfo = _.find(dpcConstructorList, {dpcId: dataLoggerDeviceInfo.dpcId})
          .protocol_info;
        protocolInfo.deviceId = dataLoggerDeviceInfo.serial_number;

        /** @type {DV_DATA_LOGGER} */
        const dataLoggerInfo = {
          main_seq: this.main_seq,
          data_logger_def_seq: _.get(
            _.find(prevDLGList, {target_prefix: dataLoggerClassInfo.target_prefix}),
            'data_logger_def_seq',
            null,
          ),
          serial_number: dataLoggerDeviceInfo.serial_number,
          target_code: dataLoggerDeviceInfo.target_code,
          connect_info: JSON.stringify(
            _.find(dccConstructorList, {dccId: dataLoggerDeviceInfo.dccId}).connect_info,
          ),
          protocol_info: JSON.stringify(protocolInfo),
        };

        // DV_NODE 경우 uniqueKey가 Seq이기 때문에 update일 경우에 해당 seq를 삽입한 확장
        const dataLoggerSeq = _.get(_.find(prevDLList, {dataLoggerId}), 'data_logger_seq', null);
        if (_.isNumber(dataLoggerSeq)) {
          _.assign(dataLoggerInfo, {data_logger_seq: dataLoggerSeq});
        }
        tempStorage.addStorage(dataLoggerInfo, 'data_logger_seq', 'data_logger_seq');
      });
    });

    // BU.CLI(tempStorage.getFinalStorage());
    return this.doQuery(tempStorage, 'DV_DATA_LOGGER', ['data_logger_seq'], false);
  }

  /**
   * @desc Step 3. DV_NODE_CLASS
   */
  async setNodeClass() {
    const tempStorage = new TempStorage();
    /** @type {DV_NODE_CLASS[]} */
    const prevNCList = await this.biModule.getTable('DV_NODE_CLASS');

    tempStorage.setExistStorage(prevNCList);

    this.map.setInfo.nodeStructureList.forEach(nodeClassInfo => {
      const pickInfo = _.omit(nodeClassInfo, ['defList']);
      tempStorage.addStorage(pickInfo, 'target_id', 'node_class_seq');
    });

    return this.doQuery(tempStorage, 'DV_NODE_CLASS', ['node_class_seq'], false);
  }

  /**
   * @desc Step 4. DV_NODE_DEF
   */
  async setNodeDef() {
    const tempStorage = new TempStorage();

    /** @type {DV_NODE_CLASS[]} */
    const prevNCList = await this.biModule.getTable('DV_NODE_CLASS');
    /** @type {DV_NODE_DEF[]} */
    const prevNDList = await this.biModule.getTable('DV_NODE_DEF');

    tempStorage.setExistStorage(prevNDList);

    this.map.setInfo.nodeStructureList.forEach(nodeClassInfo => {
      nodeClassInfo.defList.forEach(nodeDefInfo => {
        const pickInfo = _.omit(nodeDefInfo, 'nodeList');
        _.assign(pickInfo, {
          node_class_seq: _.get(
            _.find(prevNCList, {target_id: nodeClassInfo.target_id}),
            'node_class_seq',
            null,
          ),
        });
        tempStorage.addStorage(pickInfo, 'target_id', 'node_def_seq');
      });
    });

    return this.doQuery(tempStorage, 'DV_NODE_DEF', ['node_def_seq'], false);
  }

  /**
   * @desc Step 5. DV_NODE
   */
  async setNode() {
    const tempStorage = new TempStorage();

    /** @type {DV_NODE_DEF[]} */
    const prevNDList = await this.biModule.getTable('DV_NODE_DEF');
    /** @type {DV_NODE[]} */
    const prevNList = await this.biModule.getNodeTbl([this.main_seq]);
    /** @type {DV_DATA_LOGGER[]} */
    const prevDLList = await this.biModule.getDataLoggerTbl([this.main_seq]);

    tempStorage.setExistStorage(prevNList);

    // 노드 대분류 구조 목록을 순회
    this.setInfo.nodeStructureList.forEach(nodeClassInfo => {
      // 노드 개요 목록 순회
      nodeClassInfo.defList.forEach(nodeDefInfo => {
        // 노드 목록 순회
        nodeDefInfo.nodeList.forEach(nodeInfo => {
          // 노드 ID 정의
          let nodeId = nodeDefInfo.target_prefix;
          if (nodeInfo.target_code) {
            nodeId += `_${nodeInfo.target_code}`;
          }

          // 노드 ID가 사용되어지는 DL ID 목록을 지정
          const usedDataLoggerIdList = [];
          _.forEach(this.setInfo.dataLoggerStructureList, dataStructureInfo => {
            dataStructureInfo.dataLoggerDeviceList.forEach(dataLoggerInfo => {
              let dataLoggerId = dataStructureInfo.target_prefix;
              if (dataLoggerInfo.target_code.length) {
                dataLoggerId += `_${dataLoggerInfo.target_code}`;
              }

              // 데이터 로거가 해당 Node ID를 가지고 있다면 삽입
              if (_.includes(dataLoggerInfo.nodeList, nodeId)) {
                usedDataLoggerIdList.push(dataLoggerId);
              }
            });
          });
          // 사용되어지고 있는 데이터 로거 ID 목록 순회
          usedDataLoggerIdList.forEach(dataLoggerId => {
            // dataLoggerId를 가진 DataLoggerList 목록에서 data_logger_seq 값을 정의
            const dataLoggerSeq = _.get(
              _.find(prevDLList, {dataLoggerId}),
              'data_logger_seq',
              null,
            );

            /**
             * DB에 입력할 Row 생성
             * @type {DV_NODE}
             */
            const dvNodeInfo = {
              target_code: nodeInfo.target_code,
              data_logger_index: nodeInfo.data_logger_index,
              node_def_seq: _.get(
                _.find(prevNDList, {target_id: nodeDefInfo.target_id}),
                'node_def_seq',
                null,
              ),
              data_logger_seq: dataLoggerSeq,
            };
            // DV_NODE 경우 uniqueKey가 Seq이기 때문에 update일 경우에 해당 seq를 삽입한 확장
            const nodeSeq = _.get(_.find(prevNList, {nodeId}), 'node_seq', null);
            if (_.isNumber(nodeSeq)) {
              _.assign(dvNodeInfo, {node_seq: nodeSeq});
            }
            tempStorage.addStorage(dvNodeInfo, 'node_seq', 'node_seq');
          });
        });
      });
    });

    // BU.CLI(tempStorage.getFinalStorage());
    return this.doQuery(tempStorage, 'DV_NODE', ['node_seq'], false);
  }

  /**
   * @desc Step 6. DV_PLACE_CLASS
   */
  async setPlaceClass() {
    const tempStorage = new TempStorage();
    /** @type {DV_PLACE_CLASS[]} */
    const prevPCList = await this.biModule.getTable('DV_PLACE_CLASS');

    tempStorage.setExistStorage(prevPCList);

    this.map.realtionInfo.placeRelationList.forEach(placeClassInfo => {
      const pickInfo = _.omit(placeClassInfo, ['defList']);
      tempStorage.addStorage(pickInfo, 'target_id', 'place_class_seq');
    });

    return this.doQuery(tempStorage, 'DV_PLACE_CLASS', ['place_class_seq'], false);
  }

  /**
   * @desc Step 7. DV_PLACE_DEF
   */
  async setPlaceDef() {
    const tempStorage = new TempStorage();

    /** @type {DV_PLACE_CLASS[]} */
    const prevPCList = await this.biModule.getTable('DV_PLACE_CLASS');
    /** @type {DV_PLACE_DEF[]} */
    const prevPDList = await this.biModule.getTable('DV_PLACE_DEF');

    tempStorage.setExistStorage(prevPDList);
    // 장소 대분류 순회
    this.map.realtionInfo.placeRelationList.forEach(placeClassInfo => {
      // 장소 개요 목록 순회
      placeClassInfo.defList.forEach(placeDefInfo => {
        // 장소 상세 리스트를 제외하고 선택
        const pickInfo = _.omit(placeDefInfo, 'placeList');
        // pickInfo에 place_class_seq key 추가
        _.assign(pickInfo, {
          place_class_seq: _.get(
            _.find(prevPCList, {target_id: placeClassInfo.target_id}),
            'place_class_seq',
            null,
          ),
        });
        tempStorage.addStorage(pickInfo, 'target_id', 'place_def_seq');
      });
    });

    return this.doQuery(tempStorage, 'DV_PLACE_DEF', ['place_def_seq'], false);
  }

  /**
   * @desc Step 8. DV_PLACE
   */
  async setPlace() {
    const tempStorage = new TempStorage();

    /** @type {DV_PLACE_DEF[]} */
    const prevPDList = await this.biModule.getTable('DV_PLACE_DEF');
    /** @type {DV_PLACE[]} */
    const prevPList = await this.biModule.getPlaceTbl();

    tempStorage.setExistStorage(prevPList);

    // 장소 대분류 구조 목록을 순회
    this.realtionInfo.placeRelationList.forEach(placeClassInfo => {
      // 장소 개요 목록 순회
      placeClassInfo.defList.forEach(placeDefInfo => {
        // 장소 목록 순회
        placeDefInfo.placeList.forEach(placeInfo => {
          // Place ID 정의
          let placeId = placeDefInfo.target_prefix;
          if (placeInfo.target_code) {
            placeId += `_${placeInfo.target_code}`;
          }

          /** @type {DV_PLACE} */
          const dvPlaceInfo = {
            place_def_seq: _.get(
              _.find(prevPDList, {target_id: placeDefInfo.target_id}),
              'place_def_seq',
              null,
            ),
            target_code: placeInfo.target_code,
            depth: placeInfo.depth,
            place_info: JSON.stringify(placeInfo.place_info),
          };

          // DV_PLACE 경우 uniqueKey가 Seq이기 때문에 update일 경우에 해당 seq를 삽입한 확장
          const placeSeq = _.get(_.find(prevPList, {placeId}), 'place_seq', null);
          if (_.isNumber(placeSeq)) {
            _.assign(dvPlaceInfo, {place_seq: placeSeq});
          }

          tempStorage.addStorage(dvPlaceInfo, 'place_seq', 'place_seq');
        });
      });
    });

    // BU.CLI(tempStorage.getFinalStorage());
    return this.doQuery(tempStorage, 'DV_PLACE', ['place_seq'], false);
  }

  /**
   * 장소와 노드 관계를 명시.
   * 장소 관계의 특성상 ID가 Seq이므로 update 추적이 어려우므로 항상 해당 relation을 삭제하는 것을 원칙으로 함
   * @desc Step 9. DV_PLACE_RELATION
   */
  async setPlaceRelation() {
    const tempStorage = new TempStorage();

    /** @type {DV_NODE[]} */
    const prevNList = await this.biModule.getNodeTbl([this.main_seq]);
    /** @type {DV_PLACE[]} */
    const prevPList = await this.biModule.getPlaceTbl();
    // 해당 main seq와 관련이 있는 Rows 삭제
    await this.biModule.deletePlaceTbl([this.main_seq]);

    this.realtionInfo.placeRelationList.forEach(placeClassInfo => {
      placeClassInfo.defList.forEach(placeDefInfo => {
        placeDefInfo.placeList.forEach(placeInfo => {
          // Place ID 정의
          let placeId = placeDefInfo.target_prefix;
          if (placeInfo.target_code) {
            placeId += `_${placeInfo.target_code}`;
          }

          const placeModelInfo = _.find(prevPList, {placeId});

          placeInfo.nodeList.forEach(nodeId => {
            const nodeInfo = _.find(prevNList, {nodeId});

            /** @type {DV_PLACE_RELATION} */
            const placeRelationInfo = {
              node_seq: nodeInfo.node_seq,
              place_seq: placeModelInfo.place_seq,
            };

            tempStorage.addStorage(placeRelationInfo, 'place_relation_seq', 'place_relation_seq');
          });
        });
      });
    });

    // BU.CLI(tempStorage.getFinalStorage());
    return this.doQuery(tempStorage, 'DV_PLACE_RELATION', ['place_relation_seq'], false);
  }
}

module.exports = UploadToDB;
