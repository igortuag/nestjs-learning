import { IsNotEmpty } from "class-validator";

export class CreateTeamMemberBody {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty({
    message: 'The member function should not be empty or undefine'
  })
  function: string;
}