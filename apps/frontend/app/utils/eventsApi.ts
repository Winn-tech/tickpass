
const baseApi = 'http://localhost:4000/api/v1';

export const getEvents = async () => {
  const resp = await fetch(`${baseApi}/events`);

  if (!resp.ok) {
    throw new Error(`Request failed with status ${resp.status}`);
  }

  const events = await resp.json(); 
  return events;
};

export const getSingleEvent = async (id:string)=>{
   const response = await fetch(`${baseApi}/events/${id}`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const event = await response.json();
  return event;
}
