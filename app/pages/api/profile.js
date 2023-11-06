export const profile = {
  name: 'Tom',
  email: 'tomtomballet@gmail.com',
};

export default function handler(req, res) {
  res.status(200).json(profile);
}
