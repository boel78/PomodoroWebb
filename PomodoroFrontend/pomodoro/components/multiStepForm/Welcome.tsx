import { FormWrapper } from "./FormWrapper"
export default function Welcome(){
    return(<FormWrapper title="Welcome!">
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-tomato-900">Your first steps with PomodoroBuddy</h3>
            <p>This is the first setup that you have to do to ensure a good time with PomodoroBuddy</p>
            <p>The settings will adapt the Pomodoro-Timer to your own preferences</p>
        </div>
    </FormWrapper>)
}