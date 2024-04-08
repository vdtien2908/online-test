import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
function Tooltip({ children, content }) {
    return (
        <Tippy delay={[(0, 200)]} content={content}>
            {children}
        </Tippy>
    );
}

export default Tooltip;
