'use client'

export default function PlaySeries({ id }) {
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            backgroundColor: "black"
        }}>
            <iframe
                src={`https://myembed.biz/serie/${id}`}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none"
                }}
                allowFullScreen
                loading="lazy"
            />
        </div>
    )
}