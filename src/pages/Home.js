import React from 'react'
import Actions from '../components/Actions'
import WalletList from '../components/WalletList'

function Home() {
    return (
        <>
            <Actions />
            <div className="pt-4">
                <div className="d-flex justify-content-between home-width">
                    <div>
                        <p>Tokens</p>
                    </div>
                    <div>
                        <p>Balance</p>
                    </div>
                </div>
                <WalletList />
            </div>
        </>
    )
}

export default Home
