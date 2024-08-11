import db from "../config/db.js";

const detailModel = {
  getAllDetail: function () {
    try {
      return db.query("SELECT * FROM detail_pelamar");
    } catch (err) {
      console.log(err.message);
    }
  },

  postUsers: function (
    pelamar_id,
    pendidikan_terakhir,
    riwayat_pelatihan,
    riwayat_pekerjaan
  ) {
    try {
      return db.query(
        `INSERT INTO detail_pelamar (pelamar_id, pendidikan_terakhir, riwayat_pelatihan, riwayat_pekerjaan)
         VALUES ($1, $2, $3, $4)`,
        [pelamar_id, pendidikan_terakhir, riwayat_pelatihan, riwayat_pekerjaan]
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  updateData: ({
    id,
    pelamar_id,
    pendidikan_terakhir,
    riwayat_pelatihan,
    riwayat_pekerjaan,
  }) => {
    return new Promise((resolve, reject) => {
      const query = `
    UPDATE detail_pelamar
    SET
    pelamar_id=$1,
    pendidikan_terakhir=$2,
    riwayat_pelatihan=$3,
    riwayat_pekerjaan=$4
    WHERE id = $5`;

      const values = [
        pelamar_id,
        pendidikan_terakhir,
        riwayat_pelatihan,
        riwayat_pekerjaan,
        id,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating data:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteData: function (id) {
    try {
      return db.query(`DELETE from detail_pelamar WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  getDetailById: function (id) {
    try {
      return db.query(`SELECT * FROM detail_pelamar WHERE pelamar_id = $1`, [
        id,
      ]);
    } catch (err) {
      console.log(err.message);
    }
  },
};
export default detailModel;
