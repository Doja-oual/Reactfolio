import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_PROJECT } from '@/services/queries';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || !data?.project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600">Projet introuvable</p>
          <Link to="/projects" className="text-primary-600 hover:underline mt-4 inline-block">
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  const project = data.project;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/projects" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour aux projets
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {project.image && (
            <img src={project.image} alt={project.title} className="w-full h-96 object-cover" />
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>

            <div className="flex gap-4 mb-6">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                  Code Source
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Demo Live
                </a>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-700 text-lg">{project.description}</p>
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;