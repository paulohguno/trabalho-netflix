'use client'


export default function Player({ id }) {
	return (
		<div style={{
			position: "fixed",
			top: 0,
			left: 0,
			width: "100vw",
			height: "100vh",
			margin: 0,
			padding: 0,
			zIndex: 9999
		}}>
			<iframe
				src={`https://myembed.biz/filme/${id}`}
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