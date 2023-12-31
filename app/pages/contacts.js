import { useState } from 'react';
import Layout from '../components/Layout.js';
import UserContext from '../components/UserContext'
import { useContext } from 'react';

export default function Contacts() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const { supabase } = useContext(UserContext);


  const onSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('contacts').insert([
      { firstname: firstName, lastname: lastName, email: email, message: contactMessage }
    ]);

    if (error) {
      console.error('Error inserting record:', error.message);
      setConfirmationMessage('Error inserting record: ' + error.message);
    } else {
      console.log('Record inserted successfully:', data);
      setFirstName('');
      setLastName('');
      setEmail('');
      setContactMessage('');

      setConfirmationMessage('We will contact you !');
    }
  };

  return (
    <Layout
      title="Contacts"
      description="Send contact form to the admin"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className='text-4xl font-bold text-center mb-6'>
          Contacts
        </h1>
        <form className="max-w-lg mx-auto grid gap-6" onSubmit={onSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium">
              <span>First name</span>
              <input
                type="text"
                name="firstname"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded" />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              <span>Last name</span>
              <input
                type="text"
                name="lastname"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded" />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              <span>Email</span>
              <input
                type="text"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded" />
            </label>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              <span>Message</span>
              <textarea
                name="message"
                value={contactMessage}
                required
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded" />
            </label>
          </div>
          <div>
            <button
              className="rounded-md py-2 px-4 text-white bg-blue-600 hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </form>
        {confirmationMessage &&
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setConfirmationMessage(null)}
            role="dialog"
          >
            <div
              aria-label="Alert pane"
              className="rounded-md shadow-lg max-h-[90vh] max-w-[95vw] overflow-auto bg-white p-6"
            >
              <p className="text-lg text-gray-800">{confirmationMessage}</p>
            </div>
          </div>
        }
      </div>
    </Layout>
  );
}
