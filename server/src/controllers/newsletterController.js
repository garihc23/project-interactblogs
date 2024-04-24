// server/src/controllers/newsletterController.js

const { Newsletter } = require('../models/index');
const { Parser } = require('json2csv');
const fs = require('fs');

const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Newsletter.findAll();
    return res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if(email===''){
      return res.status(400).json({ error: 'Inavlid Email' });
    }
    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ where: { email } });
    if (existingSubscription) {
      return res.status(400).json({ error: 'Email already subscribed to newsletter' });
    }

    // Create new subscription
    const newSubscription = await Newsletter.create({ email });
    return res.status(201).json(newSubscription);
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const blockSubscription = async (req, res) => {
  try {
    const { subscribeId } = req.params;
    console.log(subscribeId)
    const subscription = await Newsletter.findByPk(subscribeId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    // Block subscription logic here (set isBlocked flag to true, for example)
    if (!subscription.isBlocked) {
      subscription.isBlocked = true;
    }
    else {
      subscription.isBlocked = false;
    }

    await subscription.save();
    return res.status(200).json({ message: 'Subscription blocked successfully' });
  } catch (error) {
    console.error('Error blocking subscription:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { subscribeId } = req.params;
    const subscription = await Newsletter.findByPk(subscribeId);
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    await subscription.destroy();
    return res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting subscription:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const downloadActiveSubscribers = async (req, res) => {
  try {
      const activeSubscribers = await Newsletter.findAll({ where: { isBlocked: false } });
      const fields = ['email'];
      const json2csvParser = new Parser({ fields });
      const csvData = json2csvParser.parse(activeSubscribers);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=active_subscribers.csv');
      res.status(200).send(csvData);
  } catch (error) {
      console.error('Error downloading active subscribers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllSubscriptions,
  subscribeToNewsletter,
  blockSubscription,
  deleteSubscription,
  downloadActiveSubscribers, 
};
