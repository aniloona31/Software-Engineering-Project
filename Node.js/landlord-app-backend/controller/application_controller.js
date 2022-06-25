const Application = require('../model/Application');
const Property = require('../model/Property');

module.exports.myProperties = async (req, res) => {
    try {
        const applications = await Application.find({ 'landlord': req.user._id ,'status' : 'Pending'}).populate(['customer', 'property']);
        if (applications) {
            let applicationData = applications.map((item) => {
                return {
                    _id: item._id,
                    property: item.property,
                    customer: {
                        _id: item.customer._id,
                        email: item.customer.email
                    },
                    status: item.status
                }
            })
            return res.status(200).send({
                applications: applicationData
            })
        } else {
            return res.status(400).send({
                message: 'bad request'
            })
        }

    } catch (err) {
        return res.status(500).send({
            message: 'inernal server error'
        })
    }
}

module.exports.applyForProperty = async (req, res) => {
    const propertyId = req.params.propertyId;
    try {
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(400).send({
                message: "property doesn't exist"
            });
        }
        const newApplication = await Application.create({
            property: propertyId,
            landlord: property.landlord,
            customer: req.user._id,
            status: 'Pending'
        });

        if (newApplication) {
            return res.status(200).send({
                message: 'applied'
            });
        } else {
            return res.status(500).send({
                message: 'internal server error'
            });
        }
    } catch (err) {
        return res.status(500).send({
            message: 'internal server error'
        });
    }
}

module.exports.appliedProperties = async(req,res) =>{
    const customerId = req.user._id;
    try{
        const properties = await Application.find({'customer' : customerId}).populate('property');
        if(properties){
            const propertiesResponse = properties.map((item)=>{
                return {
                    _id : item._id,
                    status : item.status,
                    property : item.property
                }
            });
            return res.status(200).send({
                properties : propertiesResponse
            });
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            message: 'internal server error'
        });
    }
}