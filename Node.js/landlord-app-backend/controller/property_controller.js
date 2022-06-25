const Property = require('../model/Property')

module.exports.addNewProperty = async(req,res) => {
    const propertyData = req.body;

    try{
        let property = await Property.findOne({'address' : propertyData.address});
        if(property){
            return res.status(401).send({
                message : 'property already exists'
            });
        }else{
            const newProperty = await Property.create({
                size : propertyData.size,
                address : propertyData.address,
                landlord : req.user._id,
                rent : propertyData.rent,
                location : propertyData.location,
                image : propertyData.image,
                ratings : 0
            })
            if(newProperty){
                return res.status(200).send({
                    message : 'registerd'
                })
            }else{
                return res.status(500).send({
                    message : 'internal server error'
                })
            }
        }
    }catch(err){
        return res.status(500).send({
            message : 'internal server error'
        })
    }
}

module.exports.checkRole = roles => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        return next();
    }
    return res.status(401).send({
        message: "unauthorized"
    })
}

module.exports.allProperties = async(req,res) =>{
    try{
        const properties = await Property.find({}).populate('landlord');
        if(properties){
            return res.status(200).send({
                properties : properties
            });
        }else{
            return res.status(500).send({
                message : 'some error occured'
            })
        }

    }catch(err){
        return res.status(500).send({
            message : 'some error occured'
        })
    }

}