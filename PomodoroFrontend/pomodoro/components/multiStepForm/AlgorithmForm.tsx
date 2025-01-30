import { FormWrapper } from "./FormWrapper";

type UserData = {
    Algorithm: string
}

type UserFormProps = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export default function AlgorithmForm({Algorithm, updateFields}: UserFormProps){
    return(
    <FormWrapper title="How do you want your sessions?">
        <div className="flex flex-col items-center pt-8">
            <h3>Do you want longer breaks to let your mind rest?</h3>
            <h3 className="font-bold text-tomato-800">Or</h3>
            <h3 className="mb-4">Do you want shorter breaks to absorb more information?</h3>
            <select onChange={e => updateFields({Algorithm: e.currentTarget.value})} className="p-2 shadow-md" value={Algorithm}>
                <option value={"longer_break"}>Longer breaks</option>
                <option value={"shorter_break"}>Shorter breaks</option>
            </select>
        </div>
    </FormWrapper>)
}