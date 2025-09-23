import Card from "app/ui/card"



const employees = [
    {name: 'Amy', title:'CEO', image: '../../../assets/bengal-2476933_1280.jpg'},
    {name: 'Fi', title:'COO', image: '../../../assets/bengal-2476933_1280.jpg'}
];
export default function About (){
    return (
        <div>
            <h1>About Me</h1>
         {employees.map((e) => (<Card key={e.name} employee={e.name} title={e.title} />))}
        </div>
    );
}