

const home = async (req, res) => {
  try {

    const payload = {
        title: "pdasdasd"
    }

    res.status(200).render('home', payload)
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = home;