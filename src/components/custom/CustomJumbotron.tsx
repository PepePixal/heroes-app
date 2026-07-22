// Header heroes

interface Props {
    title: string;
    description?: string;
}

// comp. recibe title y description tipo Props
export const CustomJumbotron = ( {title, description}: Props ) => {

  return (
    // Header heroes
    <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            { title }
        </h1>
        {/* valida si viene la description, la renderiza */}
        {
            description && (
                <p className="text-gray-600 text-lg">
                    { description }
                </p>
            )
        }
    </div>
  )
}
