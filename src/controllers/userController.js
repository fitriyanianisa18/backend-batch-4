const pool = require('../config/db')
const bycrypt = require("bcrypt")

exports.getUser = (req, res, next) => {
    const user1 = {
        nama: "Anisa",
        asal: "Bandung",
        pekerjaan: "admin"
    }
    res.send(user1);
};

exports.createUser = async (req, res, next) => {
	try {
		const { email, password, nama } = req.body;

    if (!email || !password || !nama) {
      const err = new Error('Semua data harus di isi');
			err.status = 400;
      throw err;
    }
    
    const existUser = await pool.query(
      'SELECT id FROM user WHERE email = $1 LIMIT 1',
      [email]
    );
    if (existUser.rows.length > 0) {
      const err = new Error('Email sudah terdaftar');
      err.status = 400;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO user (nama, email, pwd) VALUES ($1, $2, $3) RETURNING id, nama, email',
      [nama, email, passwordHash]
    );

    return res.status(201).json({
      message: 'User berhasil terdaftar',
      data: result.rows[0],
    });
	} catch (error) {
		next(error)
	}
}