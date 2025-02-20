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
    const tokenUserId = req.user.id;
    const {id} = req.params;
   
    try {
        const sProgramme = await SProgramme.findById(id);

        if(!sProgramme){
            return res.status(404).json({message: 'Registeration not found'});
        }

        if (sProgramme.userId !== tokenUserId && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized Access' });
        }

        res.status(200).json(sProgramme);
    }catch (error) {
        res.status(404).json({message: error.message});
    }
    
}

export const createSYP= async (req, res) => {
    const { participantName, telephoneNo, age, gender, educationLevel, school, area } = req.body;
    const tokenUserId = req.user.id;
    if(!tokenUserId){
        return res.status(401).json({message: 'you should be logged in to register the programme'});
    }
    try{
        const sProgramme = await SProgramme.create({
            participantName,
            telephoneNo,
            age,
            gender,
            educationLevel,
            school,
            area,
            author: tokenUserId,
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

export const toggleRegistration = async (req, res) => {
    try {
      const { isActive } = req.body;
  
      const updatedStatus = await SProgramme.findOneAndUpdate(
        {},
        { isActive },
        { new: true, upsert: true }
      );
  
      res.status(200).json({ message: 'Registration status updated', updatedStatus });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  export const statusUpdate = async (req, res) => {
    try {
      let status = await SProgramme.findOne({});
  
      // If no document exists, initialize one with a default status
      if (!status) {
        status = await SProgramme.create({ isActive: false });
      }
  
      // Respond with the isActive value
      res.status(200).json({
        isActive: status.isActive
      });
      
    } catch (error) {
      console.error('Error fetching status:', error.message);
      res.status(500).json({ message: 'Failed to retrieve status. Please try again later.' });
    }
    
  };
  

export const deleteSYP = async (req, res) => {
    const { id } = req.params;
    const tokenUserId = req.user.id; 

    try {
        const sProgramme = await SProgramme.findById(id);

        if (!sProgramme) {
            return res.status(404).json({ message: 'Programme not found' });
        }
        if (sProgramme.userId!== tokenUserId && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'You can only delete your own registration or must be an admin' });
        }

        await SProgramme.findByIdAndDelete(id);
        res.status(200).json({ message: 'Registration deleted successfully' });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

