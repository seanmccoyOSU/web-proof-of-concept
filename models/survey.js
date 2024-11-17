const { DataTypes } = require('sequelize')

const sequelize = require('../lib/sequelize')

const Survey = sequelize.define('survey', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false, unique: false }
})

exports.SurveyClientFields = [
  "userId",
  "title"
]

exports.Survey = Survey