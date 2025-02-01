import React from 'react';

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="mx-auto">
            <header>
                <h1>hello</h1>
            </header>
            {children}
        </main>
    );
}
