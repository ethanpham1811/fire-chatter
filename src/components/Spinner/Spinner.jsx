import { Triangle } from 'react-loader-spinner'

function Spinner({ message = null, size = '40', textSize = 'sm' }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Triangle height={size} width={size} color="#4fa94d" ariaLabel="triangle-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
      {message && <p className={`text-${textSize} text-center mt-3`}>{message}</p>}
    </div>
  )
}

export default Spinner
