export default function PreviousSession({ data }){
    console.log("PreviousSession props:", data);

return(
    <div className="bg-tomato-50 px-0 md:px-9 py-5 rounded-md shadow-md flex flex-col pl-6 gap-4 text-sm md:text-lg">
        <h3>Type: {data.type}</h3>
        <p>Date: 
        <span className="block md:inline">{data.dateCreated}</span>
        </p>
        <p>Hours worked: {data.timeSpent}</p>
    </div>
)
}