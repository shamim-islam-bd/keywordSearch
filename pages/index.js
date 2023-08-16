import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Home() {
  const { register, handleSubmit, formState: { isSubmitting }, setError } = useForm();
  const [apiResponse, setApiResponse] = React.useState(null);

  const fetchData = async (data) => {
    try {
      const response = await axios.get('https://ultimate-keywords-production.up.railway.app/keyword/', {
        params: {
          keyword: data.keyword,
          lang: data.lang,
          country: data.country,
          domain: data.domain,
        },
      });
      setApiResponse(response.data);

    } catch (error) {
      setError('keyword', { type: 'manual', message: 'Error fetching data' });
    }
  };

  const onSubmit = async (data) => {
    fetchData(data);
  };

  console.log("apiResponse", apiResponse);

  return (
    <>

<div className="bg-gray-100 min-h-screen py-8">
  <div className="max-w-6xl mx-auto px-4">
    <h1 className="text-3xl font-semibold mb-6 text-center">NextJS 13 Keyword Search</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <input {...register('keyword', { required: true })} type="text" placeholder="Keyword" className="border p-2 rounded focus:outline-none focus:border-blue-500" />
        <select {...register("lang")} className="border p-2 rounded focus:outline-none focus:border-blue-500">
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="hindi">Hindi</option>
        </select>
        <select {...register("country")} className="border p-2 rounded focus:outline-none focus:border-blue-500">
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Brazil">Brazil</option>
        </select>
        <select {...register("domain")} className="border p-2 rounded focus:outline-none focus:border-blue-500">
          <option value="Google">Google</option>
          <option value="facebook">facebook</option>
          <option value="instram">instram</option>
        </select>
      </div>
      <button type="submit" disabled={isSubmitting} className={`bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {isSubmitting ? 'Searching...' : 'Submit'}
      </button>
    </form>
    {apiResponse && (
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4">Keyword</th>
                <th className="p-4">Competition</th>
                <th className="p-4">Volume</th>
                <th className="p-4">CPC Curr</th>
                <th className="p-4">CPC Value</th>
                <th className="p-4">Auto Complete</th>
                <th className="p-4">Related Searches</th>
                <th className="p-4">Related Questions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4">{apiResponse.keyword}</td>
                <td className="p-4">{apiResponse.competition}</td>
                <td className="p-4">{apiResponse.volume}</td>
                <td className="p-4">{apiResponse.cpc_currency}</td>
                <td className="p-4">{apiResponse.cpc_value}</td>
                <td className="p-4">{apiResponse.auto_complete.map((item, index) => <div key={index}>{item}</div>)}</td>
                <td className="p-4">{apiResponse.related_searches.map((item, index) => <div key={index}>{item}</div>)}</td>
                <td className="p-4">{apiResponse.related_questions.map((item, index) => <div key={index}>{item}</div>)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>

    </>
  );
}
