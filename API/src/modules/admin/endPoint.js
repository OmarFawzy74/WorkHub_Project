
import roles from "../../middleware/roles"

const endpoint={
    allfreelancers:[roles.client,roles.admin],

}

module.exports=endpoint