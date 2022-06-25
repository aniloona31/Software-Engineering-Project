const Patient = require('../model/Patient');
const Report = require('../model/Report');

module.exports.register = async(req,res) => {

    try{

        const patient = await Patient.findOne({'phone' : req.body.phone});

        if(patient){
            return res.status(200).send({
                message : 'patient already registered',
                details : patient
            });
        }else{
            await Patient.create({
                name : req.body.name,
                phone : req.body.phone
            })

            return res.status(200).send({
                message : "patient registered"
            })
        }

    }catch(err){
        console.log(err);
        return res.status(500).send({
            message : "internal server error while creating patitent"
        })
    }
}

module.exports.createReport = async (req,res) => {
    const patientId = req.params.id;
    try{
        const patient = await Patient.findById(patientId);

        if(!patient){
            return res.status(400).send({
                message : "please register the patient first"
            });
        }else{
            const report = await Report.create({
                doctor : req.user._id,
                patient : patientId,
                status : req.body.status
            })
            // console.log(patient);
            patient.reports.push(report._id);
            patient.save();
            return res.status(200).send({
                message : "report created"
            });
        }
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message : "internal server error while creating report"
        })
    }
}

module.exports.getAllReports = async(req,res) => {
    const patientId = req.params.id;
    try{
        const patient = await Patient.findById(patientId).populate({path: 'reports', options: { sort: { 'created_at': -1 } } });
        
        if(!patient){
            return res.status(400).send({
                message : "patient doesn't exist"
            });
        }else{
            const reports = await patient.reports.map((report)=>{
                return {
                    status : report.status,
                    createdAt : report.createdAt,
                    id: report._id
                }
            })
            return res.status(200).send({
                reports : reports
            })
        }

    }catch(err){
        return res.status(500).send({
            message : "inernal server error"
        })
    }
}