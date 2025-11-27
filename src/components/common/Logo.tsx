import logoIcon from "../../assets/magloIcon.png"
import logoText from "../../assets/maglo.png"

export default function Logo() {
  return (
    <div className="flex items-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg ">
        <img src={logoIcon} alt="Maglo icon" className="h-7 w-7 mr-4"/>
      </div>
         <img src={logoText} alt="Maglo" className="h-5 w-15 mt-1"/>
    </div>
  )
}
