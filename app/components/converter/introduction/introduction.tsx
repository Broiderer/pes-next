import styles from './introduction.module.scss';

export default function Introduction() {
    return <div className={styles.intro}>
        <h1 className="bro-title">Embroidery Files Converter</h1>
        <p><span className='bro-emphasis'>Convert your embroidery designs for free</span> from <a className="bro-link" href="https://edutechwiki.unige.ch/en/Embroidery_format_PES" target="_blank">PES</a> to <a className="bro-link" href="https://developer.mozilla.org/en-US/docs/Web/SVG" target="_blank">SVG</a> or from SVG to PES. This tool is currently in beta and under development. We will be adding support for additional embroidery formats in the future. Stay tuned for updates! <span className='bro-emphasis'>Start converting your SVG and PES files now.</span></p>
    </div>
}