import SProgramme from "../models/SProgramme.js";

export const getSYPs= async (req, res) => {
    try {
        const sProgrammes = await SProgramme.find();
        res.status(200).json(sProgrammes);
    }catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getSYP= async (req, res) => {
    const {id} = req.params;
    const tokenUserId = req.user.id;
    if(id !==tokenUserId || req.user.role !== 'admin'){
        return res.status(401).json({message: 'Unauthorized Access'});
    }
    try {
        const sProgramme = await SProgramme.findById(id);
        res.status(200).json(sProgramme);
    }catch (error) {
        res.status(404).json({message: error.message});
    }
    
}

export const createSYP= async (req, res) => {
    const { participantName, telephoneNo, age, gender, educationLevel, school, area } = req.body;
    // const id = req.params.id;
    const tokenUserId = req.user.id;
    // if(id !==tokenUserId){
    //     return res.status(401).json({message: 'you should be logged in to register the programme'});
    // }
    try{
        const sProgramme = await SProgramme.create({
            ...req.body,
        tokenUserId
        });
        res.status(201).json(sProgramme);
    }catch(error){
        res.status(500).json({message: error.message});
    }
    
}

export const updateSYP= async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.user.id;
    const { participantName, telephone, age, gender, educationLevel, school, area } = req.body;
    if(id !==tokenUserId){
        return res.status(401).json({message: 'you can only update your own registeration'});
    }
    try {
        const updatedSYP = await SProgramme.findByIdAndUpdate(id, {
            participantName,
            telephone,
            age,
            gender,
            educationLevel,
            school,
            area
        }, {new: true});
        res.status(200).json(updatedSYP);

    }catch(error){
        res.status(500).json({message: error.message});
    }
        
}

export const deleteSYP= async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.user.id;
    if(id !==tokenUserId){
        return res.status(401).json({message: 'you can only delete your own registeration'});
    }
    try {
        await SProgramme.findByIdAndDelete(id);
        res.status(200).json({message: 'Registeration deleted successfully'});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
