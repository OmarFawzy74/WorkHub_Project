
import roles from "../../middleware/roles.js"

const endPoint={
    uploadImage:[roles.freelancer],
    allfreelacer:[roles.admin],
    createInformation:[roles.freelancer],
    getAllInfoAboutFreelancer:[roles.admin,roles.freelancer],
}

export default endPoint