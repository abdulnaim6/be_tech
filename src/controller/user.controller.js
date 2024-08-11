import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../helper/jwt.js";

const userController = {
  listUser: async function (req, res) {
    try {
      const result = await userModel.getAllUsers();
      res.status(200).json({
        message: "Get All User Success",
        data: result.rows,
      });
    } catch (err) {
      console.error("Get User Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createUsers: async function (req, res) {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userModel.postUsers(email, hashedPassword);
      res.status(201).json({
        message: "CREATE DATA SUCCESS",
        data: result.rows,
      });
    } catch (err) {
      console.error("Create user failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await userModel.postLogin(email);

      if (result.rowCount > 0) {
        const user = result.rows[0];
        console.log("Password from request:", password);

        if (password) {
          const token = await generateToken({ users: user });
          return res.status(200).json({
            message: "Login successful",
            token: token,
            data: user,
          });
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      } else {
        return res.status(400).json({ message: "Invalid email" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        error: error.message,
        message: "An error occurred during login",
      });
    }
  },

  updateUser: async function (req, res) {
    try {
      const { id } = req.params;
      const {
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
      } = req.body;

      const result = await userModel.updateUsers({
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
      });

      if (result.rowCount > 0) {
        res.status(200).json({
          message: "Update users success",
          data: result.data,
        });
      } else {
        res.status(404).json({
          message: "Data not found",
        });
      }
    } catch (err) {
      console.error("Update users failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deleteUser: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await userModel.deleteUsers(id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result.data,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getDataByID: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await userModel.getByID(id);
      if (result.rows.length > 0) {
        res.send({
          data: result.rows,
        });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  search: (req, res) => {
    const { keyword, position } = req.query;

    userModel
      .search(keyword, position)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
};
export default userController;
