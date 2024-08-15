const History = require('../models/History');

exports.getHistory = async (req, res) => {
  try {
    const history = await History.findAll({ where: { userId: req.user.id } });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSearchHistory = async (req, res) => {

  const { historyIds } = req.body;
  const userId = req.user.id;

  console.log(historyIds)

  try {
      // Ensure only the logged-in user's history is deleted
      await History.destroy({
          where: {
              id: historyIds,
              userId: userId
          }
      });

      return res.json({ success: true, message: 'Search history deleted successfully' });
  } catch (error) {
      console.error('Error deleting search history:', error);
      return res.status(500).json({ error: 'Failed to delete search history' });
  }
};