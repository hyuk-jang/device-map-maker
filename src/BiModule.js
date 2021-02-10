const { BM } = require('base-model-jh');

class BiModule extends BM {
  constructor(dbInfo) {
    super(dbInfo);

    this.dbInfo = dbInfo;
  }

  /**
   * 노드 테이블 데이터 추출
   * @param {number[]=} mainSeqList
   * @return {DV_NODE}
   */
  getNodeTbl(mainSeqList) {
    let sql = `
      SELECT 
          dn.*, 
          dnd.target_prefix, 
          CASE
          WHEN LENGTH(dn.target_code) > 0
            THEN CONCAT(dnd.target_prefix, "_", dn.target_code)
          ELSE 
            CONCAT(dnd.target_prefix)
          END AS nodeId,
            ddl.main_seq
      FROM dv_node dn
      LEFT JOIN dv_node_def dnd
      ON dnd.node_def_seq = dn.node_def_seq
      LEFT JOIN dv_data_logger ddl
      ON ddl.data_logger_seq = dn.data_logger_seq
    `;
    if (mainSeqList.length) {
      sql += ` WHERE ddl.main_seq IN (${mainSeqList})`;
    }

    return this.db.single(sql);
  }

  /**
   * 장소 테이블 데이터 추출
   * @param {number[]=} mainSeqList
   * @return {DV_PLACE}
   */
  getPlaceTbl(mainSeqList) {
    let sql = `
      SELECT 
          dp.*,
          dpd.target_prefix,
          CASE
          WHEN LENGTH(dp.target_code) > 0
            THEN CONCAT(dpd.target_prefix, "_", dp.target_code)
          ELSE 
            CONCAT(dpd.target_prefix)
          END AS placeId
      FROM dv_place dp
      JOIN dv_place_def dpd
      ON dpd.place_def_seq = dp.place_def_seq
    `;
    if (mainSeqList.length) {
      sql += ` WHERE dp.main_seq IN (${mainSeqList})`;
    }

    return this.db.single(sql);
  }

  /**
   * 데이터 로거 테이블 데이터 추출
   * @param {number[]=} mainSeqList
   */
  getDataLoggerTbl(mainSeqList) {
    let sql = `
    SELECT 
          ddl.*,
          CASE
          WHEN LENGTH(ddl.target_code) > 0
            THEN CONCAT(ddld.target_prefix, "_", ddl.target_code)
          ELSE 
            CONCAT(ddld.target_prefix)
          END AS dataLoggerId
      FROM dv_data_logger ddl
    JOIN dv_data_logger_def ddld
      ON ddld.data_logger_def_seq = ddl.data_logger_def_seq
  `;
    if (mainSeqList.length) {
      sql += ` WHERE ddl.main_seq IN (${mainSeqList})`;
    }

    return this.db.single(sql);
  }

  /**
   * 장소 관계 테이블 데이터 삭제
   * @param {number[]=} mainSeqList
   */
  deletePlaceTbl(mainSeqList) {
    let sql = `
      DELETE
          dpr
      FROM dv_place_relation dpr
      JOIN dv_node dn
      ON dn.node_seq = dpr.node_seq
      JOIN dv_data_logger ddl
      ON ddl.data_logger_seq = dn.data_logger_seq
  `;
    if (mainSeqList.length) {
      sql += ` WHERE ddl.main_seq IN (${mainSeqList})`;
    }

    return this.db.single(sql);
  }
}
module.exports = BiModule;
