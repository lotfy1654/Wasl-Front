export function NoContentRed({ title }) {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-red-100">
            <div className="text-center p-8 bg-red-50 border-2 border-red-200 rounded-lg shadow-xl max-w-md w-full">
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-red-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m2-2l2 2-2 2m-4-6l-2-2-2 2"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-red-800 mb-4">
                    {title}
                </h2>
                <p className="text-lg text-red-600 mb-6">
                    لا يوجد أي محتوى هنا. يُرجى التحقق لاحقًا أو
                    <a
                        href="/contact"
                        className="text-red-500 hover:text-red-700"
                    >
                        الاتصال بنا
                    </a>
                    لمزيد من التفاصيل.
                </p>
                <div>
                    <a
                        href="/"
                        className="px-8 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all"
                    >
                        العودة إلى الصفحة الرئيسية
                    </a>
                </div>
            </div>
        </div>
    )
}

export function NoContentGreen({ title }) {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-green-100 to-teal-100">
            <div className="text-center p-10 bg-white border-2 border-green-300 rounded-lg shadow-2xl max-w-md w-full">
                <div className="mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-28 w-28 text-green-500 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m2-2l2 2-2 2m-4-6l-2-2-2 2"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-green-800 mb-4">
                    {title}
                </h2>
                <p className="text-lg text-green-600 mb-8">
                    لا يوجد أي محتوى هنا. يُرجى التحقق لاحقًا أو{" "}
                    <a
                        href="/contact"
                        className="text-green-500 hover:text-green-700 transition-colors duration-300"
                    >
                        الاتصال بنا
                    </a>{" "}
                    لمزيد من التفاصيل.
                </p>
                <div>
                    <a
                        href="/"
                        className="px-10 py-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 ease-in-out transform hover:scale-105"
                    >
                        العودة إلى الصفحة الرئيسية
                    </a>
                </div>
            </div>
        </div>
    );
}


export function NoContentWarning({ title }) {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-yellow-100">
            <div className="text-center p-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow-xl max-w-md w-full">
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-yellow-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 2L2 22h20L12 2zm0 13v2m0-4v2"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-yellow-800 mb-4">
                    {title}
                </h2>
                <p className="text-lg text-yellow-600 mb-6">
                    لا يوجد أي محتوى هنا. يُرجى التحقق لاحقًا أو
                    <a
                        href="/contact"
                        className="text-yellow-500 hover:text-yellow-700"
                    >
                        الاتصال بنا
                    </a>
                    لمزيد من التفاصيل.
                </p>
                <div>
                    <a
                        href="/"
                        className="px-8 py-3 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition-all"
                    >
                        العودة إلى الصفحة الرئيسية
                    </a>
                </div>
            </div>
        </div>
    );
}


export function NoContentInfo({ title }) {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-blue-100">
            <div className="text-center p-8 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-xl max-w-md w-full">
                <div className="mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-blue-400 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 2L2 22h20L12 2zm0 13v2m0-4v2"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-blue-800 mb-4">
                    {title}
                </h2>
                <p className="text-lg text-blue-600 mb-6">
                    لا يوجد أي محتوى هنا. يُرجى التحقق لاحقًا أو
                    <a
                        href="/contact"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        الاتصال بنا
                    </a>
                    لمزيد من التفاصيل.
                </p>
                <div>
                    <a
                        href="/"
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
                    >
                        العودة إلى الصفحة الرئيسية
                    </a>
                </div>
            </div>
        </div>
    );
}
