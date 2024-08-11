import db from "../config/db.js";

const userModel = {
  getAllUsers: function () {
    try {
      return db.query("SELECT * FROM biodata");
    } catch (err) {
      console.log(err.message);
    }
  },

  postUsers: function (email, password) {
    try {
      return db.query(`INSERT INTO biodata (email, password) VALUES ($1, $2)`, [
        email,
        password,
      ]);
    } catch (err) {
      console.log(err.message);
    }
  },

  postLogin: (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM biodata WHERE email = $1";
      const values = [email];

      db.query(query, values, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },

  updateUsers: ({
    id,
    posisi_dilamar,
    nama,
    no_ktp,
    tempat_tanggal_lahir,
    jenis_kelamin,
    agama,
    golongan_darah,
    status,
    alamat_ktp,
    alamat_tinggal,
    email,
    no_telp,
    kontak_hubungi,
    skill,
    mutasi,
    penghasilan_diharapkan,
  }) => {
    return new Promise((resolve, reject) => {
      const query = `
            UPDATE biodata
            SET 
                posisi_dilamar = $1,
                nama = $2,
                no_ktp = $3,
                tempat_tanggal_lahir = $4,
                jenis_kelamin = $5,
                agama = $6,
                golongan_darah = $7,
                status = $8,
                alamat_ktp = $9,
                alamat_tinggal = $10,
                email = $11,
                no_telp = $12,
                kontak_hubungi = $13,
                skill = $14,
                mutasi = $15,
                penghasilan_diharapkan = $16
            WHERE 
                id = $17
        `;

      const values = [
        posisi_dilamar,
        nama,
        no_ktp,
        tempat_tanggal_lahir,
        jenis_kelamin,
        agama,
        golongan_darah,
        status,
        alamat_ktp,
        alamat_tinggal,
        email,
        no_telp,
        kontak_hubungi,
        skill,
        mutasi,
        penghasilan_diharapkan,
        id,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating user:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteUsers: function (id) {
    try {
      return db.query(`DELETE from biodata WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  getByID: (id) => {
    return db.query("SELECT * FROM biodata WHERE id = $1", [id]);
  },

  search: (keyword, position) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM biodata WHERE nama ILIKE '%${keyword}%'`;

      if (position) {
        query += ` AND posisi_dilamar ILIKE '%${position}%'`;
      }
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};
export default userModel;
