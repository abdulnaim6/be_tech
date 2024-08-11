import detailModel from "../model/detail.model.js";

const detailController = {
  listDetail: async function (req, res) {
    try {
      const result = await detailModel.getAllDetail();
      res.status(200).json({
        message: "Get All Detail Success",
        data: result,
      });
    } catch (err) {
      console.error("Get Detail Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createDetail: async function (req, res) {
    try {
      const pelamar_id = req.params.id;
      const { pendidikan_terakhir, riwayat_pelatihan, riwayat_pekerjaan } =
        req.body;
      const result = await detailModel.postUsers(
        pelamar_id,
        pendidikan_terakhir,
        riwayat_pelatihan,
        riwayat_pekerjaan
      );
      res.status(201).json({
        message: "CREATE DATA SUCCESS",
        data: result.rows,
      });
    } catch (err) {
      console.error("Create Data failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  updateData: async function (req, res) {
    try {
      const { id } = req.params;
      const {
        pelamar_id,
        pendidikan_terakhir,
        riwayat_pelatihan,
        riwayat_pekerjaan,
      } = req.body;

      const result = await detailModel.updateData({
        id,
        pelamar_id,
        pendidikan_terakhir,
        riwayat_pelatihan,
        riwayat_pekerjaan,
      });

      if (result.rowCount > 0) {
        res.status(200).json({
          message: "Update data success",
          data: result.data,
        });
      } else {
        res.status(404).json({
          message: "Data not found",
        });
      }
    } catch (err) {
      console.error("Update data failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deleteData: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await detailModel.deleteData(id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result.data,
        });
      } else {
        res.status(404).json({
          message: "Data not found",
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  getDetailById: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await detailModel.getDetailById(id);

      if (result.rows.length > 0) {
        res.status(200).json({
          message: "Data fetched successfully",
          data: result.rows[0],
        });
      } else {
        res.status(404).json({
          message: "Data not found",
        });
      }
    } catch (err) {
      console.error("Error fetching data", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};
export default detailController;
