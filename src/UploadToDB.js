require('dotenv').config();

const _ = require('lodash');
const { BU } = require('base-util-jh');
const { TempStorage } = require('base-model-jh');
const {
  dcmConfigModel: {
    nodeDataType: { DEVICE, SENSOR, NONE },
  },
} = require('./module').di;

const { SOURCE_PATH, SOURCE_FILE } = process.env;
/** @type {mDeviceMap} */
// eslint-disable-next-line import/no-dynamic-require
const map = require(`../src/maps/${SOURCE_PATH}/${SOURCE_FILE}`);

const BiModule = require('./BiModule');

const LOGGER_DEF_KEY = ['target_name', 'target_prefix'];

const NODE_CLASS_KEY = [
  'target_id',
  'target_name',
  'is_sensor',
  'save_db_type',
  'data_unit',
  'description',
];
const NODE_DEF_KEY = [
  'target_id',
  'target_prefix',
  'target_name',
  'is_submit_api',
  'is_avg_center',
  'description',
];

const PLACE_CLASS_KEY = ['target_id', 'target_name', 'description'];
const PLACE_DEF_KEY = ['target_id', 'target_prefix', 'target_name'];
const PLACE_KEY = [
  'target_code',
  'target_name',
  'chart_color',
  'chart_sort_rank',
  'depth',
  'place_info',
];

class UploadToDB {
  constructor() {
    const dbInfo = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_DB,
    };
    this.biModule = new BiModule(dbInfo);

    this.drawInfo = map.drawInfo;
    this.setInfo = map.setInfo;
    this.relationInfo = map.relationInfo;
    this.controlInfo = map.controlInfo;

    this.map = map;
  }

  async startUpload() {
    this.init();

    await this.getMainSeq();
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
    process.exit();
  }

  /** repeatEleList 를 기반으로 List 재구성 */
  async init() {
    this.setRepeatNode();

    // await this.writeMapFile();
  }

  /** Map File 생성 */
  async writeMapFile() {
    BU.CLI('writeMapFile');
    await BU.writeFile('./outputMap.txt', this.map);
    process.exit();
  }

  setRepeatNode() {
    const { repeatNodeList } = this.setInfo;

    // 노드 목록 repeatNodeList 반영
    this.setInfo.nodeStructureList.forEach(nodeClassInfo => {
      nodeClassInfo.defList.forEach(nodeDefInfo => {
        const { repeatId = '' } = nodeDefInfo;
        // repeatId가 있을 경우
        if (repeatId.length) {
          const repeatNodeInfo = _.find(repeatNodeList, {
            repeatId,
            repeatCategory: 'node',
          });

          if (_.get(repeatNodeInfo, 'nodeList')) {
            nodeDefInfo.nodeList = repeatNodeInfo.nodeList;
          }

          delete nodeDefInfo.repeatId;
        }
      });
    });

    // 데이터 로거 재구성
    this.setInfo.dataLoggerStructureList.forEach(dataLoggerDefInfo => {
      const { dataLoggerDeviceList = [] } = dataLoggerDefInfo;
      dataLoggerDeviceList.forEach(dataLoggerInfo => {
        const { repeatId = '', target_code: uniqNumber = '' } = dataLoggerInfo;
        // repeatId가 있을 경우
        if (repeatId.length) {
          const prefixNodeList = _.find(repeatNodeList, {
            repeatId,
            repeatCategory: 'prefix',
          }).nodeList;

          dataLoggerInfo.nodeList = prefixNodeList.map(
            prefix => `${prefix}_${uniqNumber}`,
          );

          delete dataLoggerInfo.repeatId;
        }
      });
    });

    // 장소 재구성
    this.relationInfo.placeRelationList.forEach(pClassInfo => {
      const { defList } = pClassInfo;
      defList.forEach(pDefInfo => {
        const { placeList = [] } = pDefInfo;
        placeList.forEach(placeInfo => {
          const {
            repeatId = '',
            target_code: uniqNumber = '',
            nodeList = [],
          } = placeInfo;
          // repeatId가 있을 경우
          if (repeatId.length) {
            const prefixNodeList = _.find(repeatNodeList, {
              repeatId,
              repeatCategory: 'prefix',
            }).nodeList;

            // 반복해서 추가할 node 구성
            const addNodeList = prefixNodeList.map(prefix => `${prefix}_${uniqNumber}`);

            // 설정한 nodeList 에 동적으로 생성된 nodeList를 붙임
            placeInfo.nodeList = _.concat(nodeList, addNodeList);

            delete placeInfo.repeatId;
          }
        });
      });
    });
  }

  /**
   * 저장소에 저장된 내역을 기준으로 insert, update 수행 후 Promise 반환
   * @param {TempStorage} storage TempStroage Class Object
   * @param {string} tblName
   * @param {string[]} updateKeyList
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
   * @desc Step 0. Main_Seq 설정
   */
  async getMainSeq() {
    /** @type {MAIN} */
    const mainRow = await this.biModule.getTableRow(
      'MAIN',
      {
        uuid: this.map.setInfo.mainInfo.uuid,
      },
      false,
    );
    if (_.isEmpty(mainRow)) {
      throw new Error(
        `해당 Main UUID는 존재하지 않습니다.${this.map.setInfo.mainInfo.uuid}`,
      );
    }
    this.main_seq = mainRow.main_seq;
  }

  /**
   * @desc Step 1. DV_DATA_LOGGER_DEF
   * 장치 구성 정보 설정
   */
  async setDataLoggerDef() {
    const tempStorage = new TempStorage();
    const prevDLGList = await this.biModule.getTable('DV_DATA_LOGGER_DEF');

    tempStorage.setExistStorage(prevDLGList);

    this.setInfo.dataLoggerStructureList.forEach(dataLoggerInfo => {
      const pickInfo = {};
      _.forEach(LOGGER_DEF_KEY, key => {
        if (!_.has(pickInfo, key)) {
          _.set(pickInfo, key, _.get(dataLoggerInfo, key, null));
        }
      });

      tempStorage.addStorage(pickInfo, 'target_prefix', 'data_logger_def_seq');
    });

    return this.doQuery(
      tempStorage,
      'DV_DATA_LOGGER_DEF',
      ['data_logger_def_seq'],
      false,
    );
  }

  /**
   * @desc Step 2. DV_DATA_LOGGER
   * 장치 구성 정보 설정
   * @tutorial
   * 1. getDataLoggerTbl은 target_code 가 존재하면 _${target_code} 를 추가한 dataLoggerId Key를 추가
   * 2. 새로이 생성한 DL 정보의 ID(dataLoggerId 생성 방식 동일)가 가져온 DB에 존재한다면 Update, 아니라면 Insert
   */
  async setDataLogger() {
    const tempStorage = new TempStorage();

    /** @type {DV_DATA_LOGGER_DEF[]} */
    const prevDLDList = await this.biModule.getTable('DV_DATA_LOGGER_DEF');
    /** @type {DV_DATA_LOGGER[]} */
    const prevDLList = await this.biModule.getDataLoggerTbl([this.main_seq]);

    const { dccConstructorList, dpcConstructorList } = this.setInfo;

    tempStorage.setExistStorage(prevDLList);

    // 데이터 로거 대분류 구조 순회
    this.setInfo.dataLoggerStructureList.forEach(dataLoggerClassInfo => {
      const { target_prefix: prefix, dataLoggerDeviceList = [] } = dataLoggerClassInfo;
      // 데이터 로거 장치 목록 순회
      dataLoggerDeviceList.forEach(dataLoggerDeviceInfo => {
        const {
          target_name: tName = null,
          target_code: tCode = null,
          dccId,
          dpcId,
          serial_number: SN = null,
          subDeviceId: SDI = null,
          isAddSerialNumberToDCC,
          is_deleted = 0,
        } = dataLoggerDeviceInfo;

        let dataLoggerId = prefix;
        if (tCode.length) {
          dataLoggerId += `_${tCode}`;
        }

        // Device ID(S/N)를 설정하기 위하여 별도로 작업
        const { protocol_info: protocolInfo } = _.find(dpcConstructorList, {
          dpcId,
        });
        // 국번이 숫자라면 Unicode 형태라고 판단. 아닐경우에는 기본 변환

        protocolInfo.deviceId = _.isNumber(SN) ? Buffer.from([SN]).toJSON() : SN;
        // 서브 장치 ID가 존재할 경우에만 프로토콜 정보에 추가
        if (!_.isNil(SDI)) {
          protocolInfo.subDeviceId = _.isNumber(SDI) ? Buffer.from([SDI]).toJSON() : SDI;
        } else {
          delete protocolInfo.subDeviceId;
        }

        const { connect_info: connectInfo } = _.find(dccConstructorList, {
          dccId,
        });
        // SN 을 connect_info 에 추가하고자 할 경우
        isAddSerialNumberToDCC && _.set(connectInfo, 'id', SN);

        /** @type {DV_DATA_LOGGER} */
        const dataLoggerInfo = {
          main_seq: this.main_seq,
          data_logger_def_seq: _.get(
            _.find(prevDLDList, {
              target_prefix: prefix,
            }),
            'data_logger_def_seq',
            null,
          ),
          serial_number: SN,
          target_name: tName,
          target_code: tCode,
          connect_info: _.isObject(connectInfo) ? JSON.stringify(connectInfo) : null,
          protocol_info: _.isObject(protocolInfo) ? JSON.stringify(protocolInfo) : null,
          is_deleted,
        };

        // DV_NODE 경우 uniqueKey가 Seq이기 때문에 update일 경우에 해당 seq를 삽입한 확장
        const dataLoggerSeq = _.get(
          _.find(prevDLList, {
            dataLoggerId,
          }),
          'data_logger_seq',
          null,
        );

        if (_.isNumber(dataLoggerSeq)) {
          _.assign(dataLoggerInfo, {
            data_logger_seq: dataLoggerSeq,
          });
        }
        tempStorage.addStorage(dataLoggerInfo, 'data_logger_seq', 'data_logger_seq');
      });
    });

    return this.doQuery(tempStorage, 'DV_DATA_LOGGER', ['data_logger_seq'], false);
  }

  /**
   * @desc Step 3. DV_NODE_CLASS
   * @tutorial
   * 1. DV_NODE_CLASS 테이블 목록을 가져옴
   * 2. uniqueId: target_id 가 DB에 존재한다면 Update, 아니라면 Insert
   */
  async setNodeClass() {
    const tempStorage = new TempStorage();
    /** @type {DV_NODE_CLASS[]} */
    const prevNCList = await this.biModule.getTable('DV_NODE_CLASS');

    tempStorage.setExistStorage(prevNCList);

    this.setInfo.nodeStructureList.forEach(nodeClassInfo => {
      nodeClassInfo.is_sensor === undefined && _.set(nodeClassInfo, 'is_sensor', 1);
      const pickInfo = {};
      _.forEach(NODE_CLASS_KEY, key => {
        // save_db_type 지정되지 않았다면 is_sensor 값을 토대로 산정
        if (key === 'save_db_type' && !_.has(nodeClassInfo, 'save_db_type')) {
          switch (_.get(nodeClassInfo, 'is_sensor', 1)) {
            case 0:
              _.set(nodeClassInfo, key, DEVICE);
              break;
            case 1:
              _.set(nodeClassInfo, key, SENSOR);
              break;
            default:
              _.set(nodeClassInfo, key, NONE);
              break;
          }
        }

        if (!_.has(pickInfo, key)) {
          _.set(pickInfo, key, _.get(nodeClassInfo, key, null));
        }
      });
      tempStorage.addStorage(pickInfo, 'target_id', 'node_class_seq');
    });

    return this.doQuery(tempStorage, 'DV_NODE_CLASS', ['node_class_seq']);
  }

  /**
   * @desc Step 4. DV_NODE_DEF
   * @tutorial
   * 1. DV_NODE_CLASS, DV_NODE_DEF 테이블 목록을 가져옴
   * 2. uniqueId: target_id 가 DV_NODE_DEF DB에 존재한다면 Update, 아니라면 Insert
   */
  async setNodeDef() {
    const tempStorage = new TempStorage();

    /** @type {DV_NODE_CLASS[]} */
    const prevNCList = await this.biModule.getTable('DV_NODE_CLASS');
    /** @type {DV_NODE_DEF[]} */
    const prevNDList = await this.biModule.getTable('DV_NODE_DEF');

    tempStorage.setExistStorage(prevNDList);

    // Node Class 리스트 순회
    this.map.setInfo.nodeStructureList.forEach(nodeClassInfo => {
      const { is_submit_api: isSubmitApiByClass = 1, defList = [] } = nodeClassInfo;
      // DEF 목록 순회
      defList.forEach(nodeDefInfo => {
        const { is_submit_api: isSubmitApiByDef } = nodeDefInfo;
        // nodeList Key 제외 Pick
        const pickInfo = {};

        // API 전송 Flag 정의
        const isSubmitApi = _.isUndefined(isSubmitApiByDef)
          ? isSubmitApiByClass
          : isSubmitApiByDef;
        nodeDefInfo.is_submit_api = _.includes([0, 1], isSubmitApi) ? isSubmitApi : 1;

        // Def에서 필수 구성 Key가 존재하지 않는다면 Class 정보를 복사
        _.forEach(NODE_DEF_KEY, defKey => {
          if (!_.has(pickInfo, defKey)) {
            if (_.get(nodeDefInfo, defKey) === undefined) {
              _.set(pickInfo, defKey, _.get(nodeClassInfo, defKey, null));
            } else {
              _.set(pickInfo, defKey, _.get(nodeDefInfo, defKey, null));
            }
          }
        });

        //  Node Def가 NodeClass Seq를 가지고 있다면 삽입
        _.assign(pickInfo, {
          node_class_seq: _.get(
            _.find(prevNCList, {
              target_id: nodeClassInfo.target_id,
            }),
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
   * @tutorial
   * 1. DV_NODE_DEF, DV_NODE, DV_DATA_LOGGER 테이블 목록을 가져옴
   * getNodeTbl(nodeId 추가), getDataLoggerTbl(dataLoggerId 추가)은 target_code 가 존재하면 _${target_code} 를 추가한 Key를 추가
   * 2. Node nodeId(`${ndPrefix}${nCode ? `_${nCode}` : ''}`)가 데이터로거에 포함되어 있다면 해당 prevDLList의 시퀀스 삽입
   * 3. Node Target_ID의 시퀀스. prevNDList에 해당하는 시퀀스 삽입
   * 4. nodeId 가 getNodeTbl에 존재한다면 Update, 아니라면 Insert
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
        const { target_id: ndId, target_prefix: ndPrefix, nodeList = [] } = nodeDefInfo;
        // 노드 목록 순회
        nodeList.forEach(nodeInfo => {
          const {
            target_code: nCode = '',
            target_name: nName = '',
            data_logger_index: nDLIndex = 0,
            data_index: dIndex = 0,
            node_type: nType = null,
          } = nodeInfo;
          // 노드 ID 정의
          const nodeId = `${ndPrefix}${nCode ? `_${nCode}` : ''}`;

          // 노드 ID가 사용되어지는 DL ID 목록을 지정
          const usedDataLoggerIdList = [];
          _.forEach(this.setInfo.dataLoggerStructureList, dataStructureInfo => {
            const {
              target_prefix: dldPrefix,
              dataLoggerDeviceList = [],
            } = dataStructureInfo;
            dataLoggerDeviceList.forEach(dataLoggerInfo => {
              const { target_code: dlCode, nodeList: dlNodeList } = dataLoggerInfo;
              const dataLoggerId = `${dldPrefix}${dlCode ? `_${dlCode}` : ''}`;

              // 데이터 로거가 해당 Node ID를 가지고 있다면 삽입
              _.includes(dlNodeList, nodeId) && usedDataLoggerIdList.push(dataLoggerId);
            });
          });

          // 사용되어지고 있는 데이터 로거 ID 목록 순회
          usedDataLoggerIdList.forEach(dataLoggerId => {
            /**
             * DB에 입력할 Row 생성
             * @type {DV_NODE}
             */
            const dvNodeInfo = {
              target_code: nCode,
              target_name: nName,
              data_logger_index: nDLIndex,
              data_index: dIndex,
              node_type: nType,
              node_def_seq: _.get(
                _.find(prevNDList, {
                  target_id: ndId,
                }),
                'node_def_seq',
                null,
              ),
              // dataLoggerId를 가진 DataLoggerList 목록에서 data_logger_seq 값을 정의
              data_logger_seq: _.get(
                _.find(prevDLList, {
                  dataLoggerId,
                }),
                'data_logger_seq',
                null,
              ),
            };
            // DV_NODE 경우 uniqueKey가 Seq이기 때문에 update일 경우에 해당 seq를 삽입한 확장
            const nodeSeq = _.get(
              _.find(prevNList, {
                nodeId,
              }),
              'node_seq',
              null,
            );
            _.isNumber(nodeSeq) &&
              _.assign(dvNodeInfo, {
                node_seq: nodeSeq,
              });

            tempStorage.addStorage(dvNodeInfo, 'node_seq', 'node_seq');
          });
        });
      });
    });

    return this.doQuery(tempStorage, 'DV_NODE', ['node_seq'], false);
  }

  /**
   * @desc Step 6. DV_PLACE_CLASS
   * @tutorial
   * 1. DV_PLACE_CLASS 테이블 목록을 가져옴
   * 2. uniqueId: target_id 가 DB에 존재한다면 Update, 아니라면 Insert
   */
  async setPlaceClass() {
    const tempStorage = new TempStorage();
    /** @type {DV_PLACE_CLASS[]} */
    const prevPCList = await this.biModule.getTable('DV_PLACE_CLASS');

    tempStorage.setExistStorage(prevPCList);

    this.relationInfo.placeRelationList.forEach(placeClassInfo => {
      const pickInfo = {};
      _.forEach(PLACE_CLASS_KEY, key => {
        if (!_.has(pickInfo, key)) {
          _.set(pickInfo, key, _.get(placeClassInfo, key, null));
        }
      });

      tempStorage.addStorage(pickInfo, 'target_id', 'place_class_seq');
    });

    return this.doQuery(tempStorage, 'DV_PLACE_CLASS', ['place_class_seq'], false);
  }

  /**
   * @desc Step 7. DV_PLACE_DEF
   * @tutorial
   * 1. DV_PLACE_CLASS, DV_PLACE_DEF 테이블 목록을 가져옴
   * 2. uniqueId: target_id 가 DV_PLACE_DEF DB에 존재한다면 Update, 아니라면 Insert
   */
  async setPlaceDef() {
    const tempStorage = new TempStorage();

    /** @type {DV_PLACE_CLASS[]} */
    const prevPCList = await this.biModule.getTable('DV_PLACE_CLASS');
    /** @type {DV_PLACE_DEF[]} */
    const prevPDList = await this.biModule.getTable('DV_PLACE_DEF');

    tempStorage.setExistStorage(prevPDList);
    // 장소 대분류 순회
    this.relationInfo.placeRelationList.forEach(placeClassInfo => {
      const { target_id: pcId } = placeClassInfo;
      // 장소 개요 목록 순회
      placeClassInfo.defList.forEach(placeDefInfo => {
        const pickInfo = {};

        // Def에서 필수 구성 Key가 존재하지 않는다면 Class 정보를 복사
        _.forEach(PLACE_DEF_KEY, key => {
          if (!_.has(pickInfo, key)) {
            const pdValue = _.get(placeDefInfo, key, null);
            _.set(
              pickInfo,
              key,
              _.isEmpty(pdValue) ? _.get(placeClassInfo, key, null) : pdValue,
            );
          }
        });

        _.assign(pickInfo, {
          place_class_seq: _.get(
            _.find(prevPCList, {
              target_id: pcId,
            }),
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
   * @tutorial
   * 1. DV_PLACE_DEF, DV_PLACE
   * getPlaceTbl(placeId 추가), target_code 가 존재하면 _${target_code} 를 추가한 Key를 추가
   * 2. pdId가 placeDef에 포함되어 있다면 해당 prevPDList 시퀀스 삽입
   * 3. placeId(`${pdPrefix}${pCode ? `_${pCode}` : ''}`) 가 prevPList에 존재한다면 Update, 아니라면 Insert
   */
  async setPlace() {
    const tempStorage = new TempStorage();

    /** @type {DV_PLACE_DEF[]} */
    const prevPDList = await this.biModule.getTable('DV_PLACE_DEF');
    /** @type {DV_PLACE[]} */
    const prevPList = await this.biModule.getPlaceTbl([this.main_seq]);

    tempStorage.setExistStorage(prevPList);

    // 장소 대분류 구조 목록을 순회
    this.relationInfo.placeRelationList.forEach(pClassInfo => {
      const { defList = [] } = pClassInfo;
      // 장소 개요 목록 순회
      defList.forEach(pDefInfo => {
        const { target_id: pdId, target_prefix: pdPrefix, placeList = [] } = pDefInfo;
        // 장소 목록 순회
        placeList.forEach(placeInfo => {
          const { target_code: pCode = null } = placeInfo;
          // Place ID 정의
          const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;

          const pickInfo = {};
          // Def에서 필수 구성 Key가 존재하지 않는다면 null
          _.forEach(PLACE_KEY, key => {
            if (!_.has(pickInfo, key)) {
              _.set(pickInfo, key, _.get(placeInfo, key, null));
            }
          });

          // pickInfo에 place_class_seq key 추가
          _.assign(pickInfo, {
            main_seq: this.main_seq,
            place_def_seq: _.get(
              _.find(prevPDList, {
                target_id: pdId,
              }),
              'place_def_seq',
              null,
            ),
          });

          pickInfo.place_info = _.isObject(pickInfo.place_info)
            ? JSON.stringify(placeInfo.place_info)
            : null;

          // DV_PLACE 경우 uniqueKey가 Seq이기 때문에 update일 경우에 해당 seq를 삽입한 확장
          const placeSeq = _.get(
            _.find(prevPList, {
              placeId,
            }),
            'place_seq',
            null,
          );
          _.isNumber(placeSeq) &&
            _.assign(pickInfo, {
              place_seq: placeSeq,
            });

          tempStorage.addStorage(pickInfo, 'place_seq', 'place_seq');
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
   * @tutorial
   * 1. DV_NODE, DV_PLACE
   * getNodeTbl(nodeId 추가) getPlaceTbl(placeId 추가), target_code 가 존재하면 _${target_code} 를 추가한 Key를 추가
   * 2. 이전 DV_PLACE 에서 placeId가 동일한 row 추출. placeModelInfo 라고 함
   * 3. relationInfo 의 각 placeList 안에 존재하는 nodeList 목록 만큼 prevNList 에서 node_seq를 구함
   * 4. 찾은 node_seq와 place_seq를 새로이 DB Insert
   */
  async setPlaceRelation() {
    const tempStorage = new TempStorage();

    /** @type {DV_NODE[]} */
    const prevNList = await this.biModule.getNodeTbl([this.main_seq]);
    /** @type {DV_PLACE[]} */
    const prevPList = await this.biModule.getPlaceTbl([this.main_seq]);
    // 해당 main seq와 관련이 있는 Rows 삭제
    await this.biModule.deletePlaceTbl([this.main_seq]);

    this.relationInfo.placeRelationList.forEach(pClassInfo => {
      const { defList = [] } = pClassInfo;
      defList.forEach(pDefInfo => {
        const { target_prefix: pdPrefix, placeList = [] } = pDefInfo;
        placeList.forEach(placeInfo => {
          const { target_code: pCode = null, nodeList: pNodeList = [] } = placeInfo;
          // Place ID 정의
          const placeId = `${pdPrefix}${pCode ? `_${pCode}` : ''}`;
          // prevPList 에서 placeId가 동일한 Row 추출
          const placeModelInfo = _.find(prevPList, {
            placeId,
          });

          pNodeList.forEach(nodeId => {
            const nodeInfo = _.find(prevNList, {
              nodeId,
            });

            // BU.CLIN(nodeInfo);
            /** @type {DV_PLACE_RELATION} */
            const placeRelationInfo = {
              node_seq: _.get(nodeInfo, 'node_seq'),
              place_seq: _.get(placeModelInfo, 'place_seq'),
            };

            // 관계 장치중에 Node Structure에 없거나 Place 정보가 없다면 관계가 없는 것으로 판단하고 해당 값은 입력하지 않음
            if (_(placeRelationInfo).values().includes(undefined)) return false;

            tempStorage.addStorage(
              placeRelationInfo,
              'place_relation_seq',
              'place_relation_seq',
            );
          });
        });
      });
    });

    return this.doQuery(tempStorage, 'DV_PLACE_RELATION', ['place_relation_seq'], false);
  }
}

module.exports = UploadToDB;
