import { SProgramme } from "../models/index.js";

export const getSYPs = async (req, res) => {
    try {
        const sProgrammes = await SProgramme.findAll();
        res.status(200).json(sProgrammes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getSYP = async (req, res) => {
    const tokenUserId = req.user.id;
    const { id } = req.params;

    try {
        const sProgramme = await SProgramme.findByPk(id);

        if (!sProgramme) {
            return res.status(404).json({ message: 'Registeration not found' });
        }

        if (sProgramme.authorId !== tokenUserId && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized Access' });
        }

        res.status(200).json(sProgramme);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const createSYP = async (req, res) => {
    const { participantName, telephoneNo, age, gender, educationLevel, school, area } = req.body;
    // tokenUserId will be undefined if not logged in, which is fine for public registration
    const tokenUserId = req.user ? req.user.id : null;

    try {
        const sProgramme = await SProgramme.create({
            participantName,
            telephoneNo,
            age,
            gender,
            educationLevel,
            school,
            area,
            authorId: tokenUserId,
        });
        res.status(201).json(sProgramme);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

export const updateSYP = async (req, res) => {
    const id = parseInt(req.params.id);
    const tokenUserId = req.user.id;
    const { participantName, telephone, age, gender, educationLevel, school, area } = req.body;

    try {
        const sProgramme = await SProgramme.findByPk(id);
        if (!sProgramme) return res.status(404).json({ message: 'Not found' });

        if (sProgramme.authorId !== tokenUserId) {
            return res.status(401).json({ message: 'you can only update your own registeration' });
        }

        const [updated] = await SProgramme.update({
            participantName,
            telephoneNo: telephone,
            age,
            gender,
            educationLevel,
            school,
            area
        }, {
            where: { id },
            returning: true
        });

        if (updated) {
            const updatedDoc = await SProgramme.findByPk(id);
            res.status(200).json(updatedDoc);
        } else {
            res.status(404).json({ message: "Not found" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}




export const deleteSYP = async (req, res) => {
    const { id } = req.params;
    const tokenUserId = req.user.id;

    try {
        const sProgramme = await SProgramme.findByPk(id);

        if (!sProgramme) {
            return res.status(404).json({ message: 'Programme not found' });
        }
        if (sProgramme.authorId !== tokenUserId && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'You can only delete your own registration or must be an admin' });
        }

        await SProgramme.destroy({ where: { id } });
        res.status(200).json({ message: 'Registration deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
