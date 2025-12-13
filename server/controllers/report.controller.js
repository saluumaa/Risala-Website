import { Report } from "../models/index.js";

export const getReports = async (req, res) => {
    try {
        const reports = await Report.findAll({
            order: [['date', 'DESC']]
        });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReport = async (req, res) => {
    try {
        const { title, content, type, date } = req.body;
        const authorId = req.user.id;

        const report = await Report.create({
            title,
            content,
            type,
            date,
            authorId
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await Report.destroy({ where: { id } });
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
