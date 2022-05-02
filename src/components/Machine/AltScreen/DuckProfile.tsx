import { DuckData } from '../../../types/types';
import { FC, useState } from 'react';
import { padStart } from 'lodash';
import useMachineStore from '../../../store';

const profile = {
  name: 'Duck Name',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quidem ex illum ut, et commodi eveniet quisquam nostrum quibusdam obcaecati rem, fugit quaerat explicabo enim delectus ipsa nulla sequi dicta!',
  stance: 'Chillin 😃'
}

const FieldLabel = ({text}: {text:string}) => {  
  return <div className='pixel-font text-sm'>{text.toUpperCase()}</div>
}

const Field = ({text}: {text:string}) => {  
  return <div className='text-lg  pixel-font-thin track'>{text}</div>
}

interface DuckProfileProps {
  duck: DuckData;
}
const DuckProfile: FC<DuckProfileProps> = ({duck}) => {
  const [editing, setEditing] = useState(false);
  const { setShowDuckProfile } = useMachineStore();
  
  return (
    <div className="h-full p-2 ">
      <div className="h-full overflow-scroll border-2 relative">        
        
        <div className="p-2 flex flex-col gap-2">         
          <div className="flex gap-2">
            <div className="flex-1 relative">
              { true && duck.owner && (
                  <div 
                    onClick={() => setEditing(!editing)}
                    className="bg-orange-500 absolute bottom-0 left-0 pixel-font p-1 py-1 border-l-2 border-2 cursor-pointer text-xs">
                  {editing ? 'Cancel' : 'Edit'}
                </div>  
              )}
              <img               
                className="border-2 border-white"
                alt={`Duck ${duck.id}`}        
                src={`data:image/webp;base64,${duck.webp}`}
              />   
            </div>
           
            <div className="flex items-start flex-col justify-end gap-2 ">
              <div className="p-1">
                <FieldLabel text="Duck ID" /> 
                <Field text={padStart(duck.id, 3, '0')} />
              </div>
              <div className="bg-white bg-opacity-10 w-full p-1">
                <FieldLabel text="Duck Type" />
                <Field text={duck.isCustom ? 'Custom' : 'Tozzi' } />
              </div>
              <div className="p-1">
                <FieldLabel text="Hatched" />
                <Field text={padStart(duck.id, 3, '0')} />
              </div>
            </div>       
          </div>                       
          <div className="col-span-2 bg-white flex  items-center space-x-4 bg-opacity-10 p-1">
            <FieldLabel text="Name" />
            <Field text={profile.name} />
          </div>   
          <div className="col-span-2 p-1 flex  items-center space-x-4">
            <FieldLabel text="Status" />
            <Field text={profile.stance} />
          </div>             
          <div className="col-span-2 bg-white bg-opacity-10 p-1">
            <FieldLabel text="Profile" />
            <Field text={profile.description} />
          </div>  
          <div className="flex gap-2">
            <div className=" p-1 flex-1">
              <FieldLabel text="Owner" />
              <Field text={profile.name} />
            </div>    
          
            <div className=" p-1 flex-1">
              <FieldLabel text="Creator" />
              <Field text={profile.name} />
            </div>    
          </div>
          <div className="col-span-2 p-1 bg-white bg-opacity-10 ">
            <FieldLabel text="Duck Complexity"/>
            <Field text={profile.name} />
          </div>                                                              
        </div>
      </div>
    </div>
  );
}

export default DuckProfile;