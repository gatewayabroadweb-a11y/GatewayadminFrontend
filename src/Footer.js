import { memo } from "react"

function Footer() {
  return (
    <div>
      <footer className=" text-center text-white main-footer">
        <strong>Copyright ©{new Date().getFullYear()} </strong>
        All rights reserved.
      </footer>
    </div>

  )
}

export default memo(Footer)
