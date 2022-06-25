const Report = require('../model/Report');
const possibleStatus = ['Negative', 'Travelled-Quarantine',
'Symptoms-Quarantine', 'Positive-Admit']

module.exports.getAllReports = async(req,res) => {
    const status = req.params.status;
    try{
        if(!possibleStatus.includes(status)){
            return res.status(400).send({
                message : 'please enter valid status'
            });
        }else{
            const reports = await Report.find({'status' : status}).populate('patient');
            return res.status(200).send({
                reports : reports
            })
        }
    }catch{
        return res.status(500);
    }
}