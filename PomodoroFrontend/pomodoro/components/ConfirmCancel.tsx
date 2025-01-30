import { Button } from "./ui/button";

type ConfirmCancelProps = {
    setShowCancelWindow:(state: boolean) => void
    handleSuccesfullSession:() => void
  }

export default function ConfirmCancel({setShowCancelWindow, handleSuccesfullSession}: ConfirmCancelProps){
    const handleCancel = () => {
        setShowCancelWindow(false)
        handleSuccesfullSession()
    }
    return(
        <div className="absolute z-20 left-0 px-4 bg-white h-1/4 flex flex-col items-center gap-12 shadow-md pt-4">
                <h2 className="font-semibold text-tomato-600 text-md text-nowrap">Are you sure you want to cancel?</h2>
                <div className="grid grid-cols-2">
                    <Button variant={'outline'} className="bg-tomato-700 text-tomato-50 text-xs" onClick={() => setShowCancelWindow(false)}>Go back</Button>
                    <Button variant={'outline'} className="bg-green-600 text-tomato-50 text-xs" onClick={handleCancel}>Cancel the session</Button>
                </div>
        </div>
    )
}

