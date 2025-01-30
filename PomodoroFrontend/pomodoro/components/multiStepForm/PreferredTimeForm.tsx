import InputWithLabel from "../ui/input-with-label";
import { FormWrapper } from "./FormWrapper";

type UserData = {
    PrefferedBreak: string,
    PreferredTime: string
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export default function PrefferedTimeForm({PreferredTime, PrefferedBreak, updateFields}: UserFormProps){
    return(<FormWrapper title="What is your preffered pomodoro-time?">
        <div className="mt-5 flex flex-col items-center gap-5">
            <InputWithLabel label="Preffered Pomodoro-time(in hr/mm)" id="PomodoroTime" type="time" name="PomodoroTime" required={true} value={PreferredTime} onChange={e => updateFields({PreferredTime: e.target.value})}/>
            <InputWithLabel label="Preffered Break-time(in hr/mm)" id="BreakTime" type="time" name="BreakTime" required={true} value={PrefferedBreak} onChange={e => updateFields({PrefferedBreak: e.target.value})}/>
        </div>
    </FormWrapper>)
}