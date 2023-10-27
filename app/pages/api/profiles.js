//user profiles

export default function handler(req, res) {
    const userProfile = {
        username: "Tom",
        email: "tomtomballet@gmail.com"
    }
    res.status(200).json(userProfile)
}