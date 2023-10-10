import { Card, CardContent, CardDescription, CardTitle, CardHeader } from './ui/card';
interface postProps {
  name: string;
  city: string;
  message: string;
  phones: string[];
  urgency?: string;
}
export default function Post({ name, city, message, phones, urgency }: postProps) {
  return (
    <Card
      className={
        urgency == '1'
          ? 'border-red-600 bg-red-100'
          : urgency == '2'
          ? 'border-orange-600 bg-orange-100'
          : urgency == '3'
          ? 'border-blue-600 bg-blue-100'
          : ''
      }
    >
      <CardHeader>
        <div className="flex flex-row-reverse justify-between align-middle">
          {urgency && (
            <div>
              <small className="text-gray-600 font-bold">דחפות:</small>
              {urgency == '1' ? (
                <p className="text-red-600">שעה 1</p>
              ) : urgency == '2' ? (
                <p className="text-orange-600">12 שעות</p>
              ) : urgency == '3' ? (
                <p className="text-blue-600">24 שעות</p>
              ) : (
                <p>לא דחוף</p>
              )}
            </div>
          )}

          <CardTitle className="ml-auto">{name}</CardTitle>
        </div>
        <CardDescription>{city}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
      <CardContent className="flex flex-col gap-1">
        {phones.map((item, index) => {
          return (
            <p key={index} className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                  clipRule="evenodd"
                />
              </svg>

              {item}
            </p>
          );
        })}
      </CardContent>
    </Card>
  );
}
