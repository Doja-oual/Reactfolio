import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROFIL } from '../../services/queries';
import { CREATE_PROFIL, UPDATE_PROFIL } from '../../services/mutations';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Save, User, Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from 'lucide-react';

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROFIL);
  const [createProfil] = useMutation(CREATE_PROFIL);
  const [updateProfil] = useMutation(UPDATE_PROFIL);
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    titre: '',
    bio: '',
    email: '',
    telephone: '',
    photo: '',
    cv: '',
    reseauxSociaux: {
      linkedin: '',
      github: '',
      twitter: '',
      website: ''
    },
    adresse: {
      ville: '',
      pays: ''
    }
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (data?.getProfil) {
      setFormData({
        nom: data.getProfil.nom || '',
        prenom: data.getProfil.prenom || '',
        titre: data.getProfil.titre || '',
        bio: data.getProfil.bio || '',
        email: data.getProfil.email || '',
        telephone: data.getProfil.telephone || '',
        photo: data.getProfil.photo || '',
        cv: data.getProfil.cv || '',
        reseauxSociaux: {
          linkedin: data.getProfil.reseauxSociaux?.linkedin || '',
          github: data.getProfil.reseauxSociaux?.github || '',
          twitter: data.getProfil.reseauxSociaux?.twitter || '',
          website: data.getProfil.reseauxSociaux?.website || ''
        },
        adresse: {
          ville: data.getProfil.adresse?.ville || '',
          pays: data.getProfil.adresse?.pays || ''
        }
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    try {
      const input = {
        nom: formData.nom,
        prenom: formData.prenom,
        titre: formData.titre,
        bio: formData.bio,
        email: formData.email,
        telephone: formData.telephone,
        photo: formData.photo,
        cv: formData.cv,
        reseauxSociaux: formData.reseauxSociaux,
        adresse: formData.adresse
      };

      if (data?.getProfil?.id) {
        await updateProfil({
          variables: { id: data.getProfil.id, input }
        });
        setSuccessMessage('Profil mis à jour avec succès !');
      } else {
        await createProfil({ variables: { input } });
        setSuccessMessage('Profil créé avec succès !');
      }
      
      refetch();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving profile:', err);
      alert('Erreur lors de la sauvegarde du profil');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-red-600">Erreur: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          {successMessage && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              {successMessage}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Informations personnelles */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre professionnel *
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Développeur Full Stack"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio *
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Adresse */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Adresse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  name="adresse.ville"
                  value={formData.adresse.ville}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pays
                </label>
                <input
                  type="text"
                  name="adresse.pays"
                  value={formData.adresse.pays}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Réseaux sociaux</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Linkedin className="inline w-4 h-4 mr-1" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="reseauxSociaux.linkedin"
                  value={formData.reseauxSociaux.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Github className="inline w-4 h-4 mr-1" />
                  GitHub
                </label>
                <input
                  type="url"
                  name="reseauxSociaux.github"
                  value={formData.reseauxSociaux.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Twitter className="inline w-4 h-4 mr-1" />
                  Twitter
                </label>
                <input
                  type="url"
                  name="reseauxSociaux.twitter"
                  value={formData.reseauxSociaux.twitter}
                  onChange={handleChange}
                  placeholder="https://twitter.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Globe className="inline w-4 h-4 mr-1" />
                  Site web
                </label>
                <input
                  type="url"
                  name="reseauxSociaux.website"
                  value={formData.reseauxSociaux.website}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Fichiers */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Fichiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Photo de profil
                </label>
                <input
                  type="url"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL CV (PDF)
                </label>
                <input
                  type="url"
                  name="cv"
                  value={formData.cv}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Enregistrement...' : 'Enregistrer le profil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;