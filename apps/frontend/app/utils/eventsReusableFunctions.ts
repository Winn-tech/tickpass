  export const formattedDate = (date:Date)=>{
    const eventDate = new Date(date)
    return eventDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })

  }
  export const formattedLocation =( location: string | {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }  )=> {
     return typeof location === 'object' ? `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`
      : location
  }

  export const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   
    .replace(/\s+/g, "-");   
