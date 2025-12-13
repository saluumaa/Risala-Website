import { Programme } from "../models/index.js";

export const getSettings = async (req, res) => {
    try {
        let settings = await Programme.findOne();
        if (!settings) {
            settings = await Programme.create({
                title: 'Summer Youth Programme',
                isActive: false
            });
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const { title, description, startDate, endDate, registrationDeadline, fee, location, activities, requirements, isActive } = req.body;

        let settings = await Programme.findOne();
        if (!settings) {
            settings = await Programme.create(req.body);
        } else {
            await settings.update(req.body);
        }

        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const toggleActive = async (req, res) => {
    try {
        const { isActive } = req.body;
        let settings = await Programme.findOne();

        if (!settings) {
            settings = await Programme.create({ isActive });
        } else {
            await settings.update({ isActive });
        }

        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
