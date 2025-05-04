import React from 'react';
import { Link } from 'react-router-dom';

const CaptainHome = () => {
  return (
    <div>
      <div>CaptainHome</div>
      <Link to="/captains/logout" className="flex items-center justify-center bg-[#B8860B] text-white w-full px-4 py-2 mb-7 rounded text-xl">Logout</Link>
    </div>
  )
}

export default CaptainHome;