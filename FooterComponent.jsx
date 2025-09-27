// import React from 'react'

// function FooterComponent() {
//   return (
//     <div>
//       <footer className='footer'>
//         <span className='text-muted'>All Rights Reserved 2025 @programmeets.io</span>
//       </footer>
//     </div>
//   )
// }

// export default FooterComponent

import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="footer">
            All Rights Reserved 2025 &copy; <a href="https://programmeets.io" style={{color: '#395886', textDecoration: 'none'}}>programmeets.io</a>
        </footer>
    );
};

export default FooterComponent;
