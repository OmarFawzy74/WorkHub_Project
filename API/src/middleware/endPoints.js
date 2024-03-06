
const roles = {
    admin:'admin',
    client:'client',
    freelancer:'freelancer',
}

const endPoints = {
    admin: [roles.admin],
    freelancer: [roles.freelancer],
    client: [roles.client],
    allUsers: [roles.admin, roles.client, roles.freelancer]
}

export default endPoints